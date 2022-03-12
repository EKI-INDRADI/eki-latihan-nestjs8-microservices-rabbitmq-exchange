import { Injectable } from '@nestjs/common';


@Injectable()
export class PageMongodbService {

    async mongodbGeneratePage(req_body: any = {}, modelName, MongoDbConnection: any) {

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

        // res_json.data = result

        //========================SORT
        let dataSort = []
        if (result.length > 0) {
            await result.forEach(async (element, index) => {

                let data_after_sort = this.objectSortAlphabetical(element).after_sort
                dataSort.push(data_after_sort)

                if (index == result.length - 1) {
                    res_json.data = dataSort
                }

            })
        }


        if (result) {
            res_json.statusCode = 200
            res_json.message = "Success, get data pages"
        } else {
            res_json.statusCode = 400
            res_json.message = "Error, not found"
        }

        res_json = this.objectSortAlphabetical(res_json).after_sort

        //========================/SORT

        return res_json

    }



    objectSortAlphabetical(req_body_origin) {

        let req_body: any = { ...req_body_origin }
        let res_json: any = {}
        let new_object = {}
        let new_array = []

        try {
            for (let i_a = 0; i_a < Object.keys(req_body).length; i_a++) {

                new_array.push({
                    k: Object.keys(req_body)[i_a],
                    v: Object.values(req_body)[i_a]
                })
            }

            new_array.sort(function (a, b) { // GITHUB COPILOT
                if (a.k < b.k) {
                    return -1;
                }
                if (a.k > b.k) {
                    return 1;
                }
                return 0;
            });

            new_object = Object.assign({}, ...new_array.map(item => ({ [item.k]: item.v })));  // GITHUB COPILOT

            let req_body_string = ""

            for (let i_b = 0; i_b < Object.keys(req_body).length; i_b++) {
                req_body_string = req_body_string.concat(`${Object.keys(req_body)[i_b]}${Object.values(req_body)[i_b]}`)
            }

            let new_object_string = ""

            for (let i_b = 0; i_b < Object.keys(new_object).length; i_b++) {
                new_object_string = new_object_string.concat(`${Object.keys(new_object)[i_b]}${Object.values(new_object)[i_b]}`)
            }

            res_json.statusCode = 200
            res_json.before_sort = req_body
            res_json.after_sort = new_object
            res_json.before_sort_string = req_body_string
            res_json.after_sort_string = new_object_string

            return res_json

        } catch (error) {
            console.log('service tools.objectSortAlphabetical, error : ' + error.message);
            res_json.statusCode = 400;
            res_json.message = error.message;
            return res_json;
        }
    }
}





