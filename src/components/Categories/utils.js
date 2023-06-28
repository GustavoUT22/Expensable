import { parseISO } from "date-fns";
import { colors } from "../../styles";

import { BsBank2, BsFillCartFill } from "react-icons/bs";
import { GiHealthNormal } from "react-icons/gi";
import { FaGamepad, FaGraduationCap } from "react-icons/fa";
import { RiBillFill, RiGiftFill } from "react-icons/ri";
import { AiFillCar } from "react-icons/ai";

const getIcon = (icon) => {
  switch(icon){
    case "bank":
      return BsBank2;
    case "cart":
      return BsFillCartFill;
    case "health":
      return GiHealthNormal;
    case "game":
      return FaGamepad;
    case "bill":
      return RiBillFill;
    case "education":
      return FaGraduationCap;
    case "car":
      return AiFillCar;
    case "gift":
      return RiGiftFill;
    default:
      break;
  }
}

export const getMonthlyData = (categories, date, type) =>
  categories
    .filter((cat) => cat["transaction_type"] === type)
    .map((cat) => {
      return {
        id: cat.id,
        name: cat.name,
        Icon: getIcon(cat.icon),
        color: cat?.["color"] == "light-blue" ? colors["lightBlue"][500] : colors[cat?.["color"]][500],
        amount: cat.transactions.reduce((acc, cur) => {
          const trxDate = parseISO(cur.date);
          const trxYear = trxDate.getFullYear();
          const trxMonth = trxDate.getMonth();
          if (trxYear === date.year && trxMonth === date.month) {
            return acc + cur.amount;
          } else {
            return acc;
          }
        }, 0),
      };
    });
