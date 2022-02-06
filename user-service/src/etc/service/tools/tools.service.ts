import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsService {

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
