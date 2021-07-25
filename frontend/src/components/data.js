import { BiFootball } from "react-icons/bi";
import { AiFillCar } from "react-icons/ai";
import { FcSportsMode, FcFilmReel, FcMusic } from "react-icons/fc";
import { GrWorkshop, GrPersonalComputer } from "react-icons/gr";
import { FcComboChart } from "react-icons/fc";
import { SiMaterialdesignicons } from "react-icons/si";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { GrTechnology } from "react-icons/gr";
import useToken from "./useToken";

async function getRequest(token, url) {
    return fetch(`http://localhost:8000/api/v1/${url}/`, {
    method: "GET",
    credentials: 'omit',
    headers: {
      'Authorization': `JWT ${token.access_token}`,
      "Content-Type": "application/json",
      'Accept': "application/json",
    },
  }
  )
  // .then(function(response) {
  //   console.log(response.json())
  //   return response.json();
  // })
  // .catch(function(error) {
  //   console.log('Request failed', error)
  // });
  }

export const CategoryData = async () => {
    const { token } = useToken();
    return await getRequest(token, 'total-theme-list');
}

// export const categoryData = [
//  {
//    title: "Футбол",
//    icon: <BiFootball />,
//  },
//  {
//    title: "Программирования",
//    icon: <GrPersonalComputer />,
//  },
//  {
//    title: "Спорт",
//    icon: <FcSportsMode />,
//  },
//  {
//    title: "Политика",
//    icon: <GrWorkshop />,
//  },
//  {
//    title: "Музыка",
//    icon: <FcMusic />,
//  },
//  {
//    title: "Фильм",
//    icon: <FcFilmReel />,
//  },
//  {
//    title: "Искусство",
//    icon: <SiMaterialdesignicons />,
//  },
//  {
//    title: "Технология",
//    icon: <GrTechnology />,
//  },
//  {
//    title: "Машина",
//    icon: <AiFillCar />,
//  },
//  {
//    title: "Бизнес",
//    icon: <FcComboChart />,
//  },
// ];
