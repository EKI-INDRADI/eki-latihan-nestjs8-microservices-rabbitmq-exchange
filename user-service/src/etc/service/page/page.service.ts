import { Injectable } from '@nestjs/common';


@Injectable()
export class PageService {

    async generatePage(req_body: any = {}, modelName, MongoDbConnection: any) {

        let res_json: any = {}

        let getData: any = null
        let getDataCount: any = null

        let aggregateCondition = []

        let req_body_condition: any = {
            ...req_body
        }

        delete req_body_condition.limit
        delete req_body_condition.skip
        delete req_body_condition.page
        delete req_body_condition.sort
        delete req_body_condition.projection

        let req_body_regex_condition: any = {}
        for (let i_a = 0; i_a < Object.keys(req_body_condition).length; i_a++) {
            if (Object.values(req_body_condition)[i_a] == '' || Object.values(req_body_condition)[i_a] == "" || Object.values(req_body_condition)[i_a] == null) {

            } else {
                if (typeof Object.values(req_body_condition)[i_a] == 'string') {
                    req_body_regex_condition[Object.keys(req_body_condition)[i_a]] = { $regex: Object.values(req_body_condition)[i_a], $options: 'i' }
                } else if (typeof Object.values(req_body_condition)[i_a] == 'number') {

                    req_body_regex_condition[Object.keys(req_body_condition)[i_a]] = Object.values(req_body_condition)[i_a]
                } else {
                    req_body_regex_condition[Object.keys(req_body_condition)[i_a]] = Object.values(req_body_condition)[i_a]

                }
            }

        }


        getDataCount = await MongoDbConnection.model(modelName).count(req_body_regex_condition)

        aggregateCondition.push({ $match: req_body_regex_condition })

        let limit: Number = 10
        let skip: Number = 0


        if (req_body.skip || req_body.limit) {

            limit = (req_body.limit) ? req_body.limit : 10
            let autoSkip = (req_body.limit && req_body.page) ? (req_body.page - 1) * req_body.limit : 0

            if (!req_body.page && req_body.skip) {
                skip = (req_body.skip) ? req_body.skip : autoSkip
            } else {
                skip = autoSkip
            }
            if (skip > 0) {
                aggregateCondition.push({ $skip: skip })
            }
            aggregateCondition.push({ $limit: limit })
        }

        if (req_body.sort) {
            aggregateCondition.push({ $sort: req_body.sort })
        }

        if (req_body.projection) {
            aggregateCondition.push({ $project: req_body.projection })
        }

        getData = await MongoDbConnection.model(modelName).aggregate(aggregateCondition)

        let total = getDataCount
        res_json.total = total

        if (skip >= 0 && !req_body.page) {
            res_json.page = Math.ceil(Number(skip) / Number(limit)) + 1
        } else {
            res_json.page = req_body.page
        }
        let result = getData

        if (req_body.skip || req_body.limit) {
            let pages = Math.ceil(total / Number(limit))
            res_json.pages = pages
        }

        res_json.data = result

        return res_json

    }

}
