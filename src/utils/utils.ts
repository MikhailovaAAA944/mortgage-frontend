import moment from "moment";
import {ru} from "./momentLocalization";

export const formate_repayment_date = (value) => {
    if (!value) {
        return "Не рассчитано"
    }

    if (value == "1970-01-01") {
        return "Не удалось рассчитать"
    }

    return moment(value).locale(ru()).format("D MMMM YYYYг")
}