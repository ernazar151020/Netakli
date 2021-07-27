import React, { useState, useEffect } from "react";
import { Button, Input, TextField } from "@material-ui/core";
import SendMessages from "./SendMessages";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import axiosInstance from "../../axiosApi";
import { Link } from "react-router-dom";
import { MdPlaylistAdd } from "react-icons/md";
const Chat = (props) => {
  const slug = props.match.params.slug;
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState([]);
  const [themeTitle, setThemeTitle] = useState("");
  const [scrollHeight, setScrollHeight] = useState(false);
  const fetchTheme = async () => {
    try {
      await axiosInstance.get(`filter_by_total/${slug}/`).then((data) => {
        console.log(data);
        setTheme(data.data);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  const createTheme = async (event) => {
    event.preventDefault();
    await axiosInstance
      .post("theme/", { title: themeTitle, total_theme: slug })
      .then((data) => {
        console.log(theme);
        setTheme([{ data: data.data, title: themeTitle }, ...theme]);
        setThemeTitle("");
      })

      .catch((err) => {
        console.log(err.response);
      });
  };

  const showForm = () => {
    setShow(!show);
    setScrollHeight(!scrollHeight);
  };

  return (
    <Wrapper>
      <div className="chat_container">
        <div className="chat_content">
          <div className="chat_content_items chat_group_content">
            <div className="chat_group_content_header">
              <h1>Chats</h1>
              <div className="add_btns">
                <button onClick={showForm}>
                  <MdPlaylistAdd className="add_btns_icon" />
                </button>
              </div>
            </div>
            {show && (
              <form className="chat_form" onSubmit={createTheme}>
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  size="small"
                  value={themeTitle}
                  onChange={(e) => setThemeTitle(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                  Создать Групп
                </Button>
              </form>
            )}
            <div
              className="chat_themes"
              style={{ height: `${scrollHeight ? "400px" : "480px"}` }}
            >
              <ul>
                {theme.map((item) => {
                  var date = new Date(item.created_at);
                  const month = date.toLocaleString("en-US", {
                    month: "long",
                  });
                  const day = date.toLocaleString("en-US", {
                    day: "2-digit",
                  });
                  // const year = item.created_at.getFullYear();
                  return (
                    <li key={item.id} className="chat_themes_items">
                      <div className="chat_themes_title">{item.title}</div>
                      <p className="chat_themes_date">
                        <span>{day}</span>
                        <span> {month}</span>
                      </p>
                    </li>
                  );
                })}
                <li></li>
              </ul>
            </div>
          </div>
          <div className="chat_content_items chat_message_content">
            <h1 className="message_content_title">Name of Channell</h1>
            <p className="message_content_subtitle">say hello!</p>

            <div className="message_content">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
              fugit, molestiae deserunt ullam officiis, veritatis et, distinctio
              officia molestias sed atque. Aliquid aut, velit quia delectus nam
              veritatis provident blanditiis quas cumque iure perspiciatis
              adipisci maxime nobis animi voluptatibus, deserunt odit voluptates
              tempora perferendis harum sit veniam tempore. Quasi perspiciatis
              corrupti qui, unde quas, sint, distinctio pariatur debitis tenetur
              totam at quam doloribus incidunt aperiam alias tempore animi
              deserunt repudiandae perferendis. Libero consectetur ad quas earum
              excepturi ducimus exercitationem atque fuga quam ratione obcaecati
              magnam omnis, officia a, at asperiores perferendis tenetur
              adipisci facilis? Possimus necessitatibus atque harum, nobis a
              pariatur totam est libero, voluptatem sit facilis! Illum,
              cupiditate accusantium aspernatur temporibus ex dolorem veniam
              adipisci odio quidem, repellat reprehenderit ipsa assumenda
              consequatur totam saepe harum. Dolorum fuga beatae error
              perspiciatis repellendus, nemo aut quis odio iste atque non,
              possimus vitae et reiciendis quisquam sint! Saepe ipsum animi
              voluptates blanditiis aspernatur accusamus consectetur amet
              placeat impedit commodi quia ex sed laboriosam inventore, ipsa
              nihil officiis repellendus modi culpa distinctio. Id adipisci
              labore nesciunt odit rerum culpa veritatis doloribus harum iste,
              libero incidunt at, ea voluptate, praesentium error? Dolor, eaque!
              Unde hic pariatur possimus est modi dignissimos. Illum rerum odio
              obcaecati fuga quas ad accusamus nam? Asperiores, minus? Fugit,
              obcaecati. Corporis non totam debitis sapiente? Veniam eveniet
              quod architecto, quasi alias veritatis accusantium aliquid
              cupiditate est magnam ullam voluptates repellendus voluptas
              aliquam sapiente, assumenda fugit reiciendis sed, autem culpa rem
              dolores maxime! Quaerat exercitationem molestiae suscipit, cum
              minima nisi sit fugiat vitae doloribus ipsa ullam dolore quidem
              voluptates facilis tempora, explicabo porro deserunt et est eius.
              Odio atque beatae eius corporis at deleniti, exercitationem
              distinctio eum sed saepe ad in omnis, fuga provident officiis
              temporibus, delectus nobis. Fugit sapiente, sunt quas dolorem
              exercitationem accusantium quidem placeat cum blanditiis corrupti
              consequatur ratione provident tempore est, eligendi atque. Aliquam
              nostrum commodi, harum quia, quibusdam quo molestiae consequuntur
              quod architecto cupiditate voluptas corrupti libero eum alias
              nisi, nulla repellendus! Itaque, totam dolorum ratione eius soluta
              pariatur culpa molestiae quidem ullam incidunt illo sequi fugit
              magnam adipisci, laboriosam sint numquam voluptatum maiores, quis
              unde. Eaque, laudantium corporis? Obcaecati quibusdam odio optio
              animi consequatur voluptate repudiandae, itaque exercitationem
              iure autem dolore ipsa recusandae debitis accusantium, sed non
              similique aperiam eos quisquam laborum repellat eveniet ea. Soluta
              eligendi molestiae voluptatem deleniti magnam fuga aliquid id,
              minima repellat illo eius corrupti rem! Quibusdam, ea ut ipsa
              voluptas dolorum mollitia placeat animi omnis voluptatibus. Unde
              alias, porro ullam maxime numquam magni quae officiis nulla. Nemo
              nesciunt qui tempora repellendus neque dicta reiciendis saepe
              autem cupiditate esse sint quas necessitatibus praesentium libero,
              dolores cum culpa id sequi molestiae dolore, veritatis voluptatum
              asperiores ad. Reiciendis corrupti error sunt, mollitia
              consequatur, veritatis dolores recusandae doloribus exercitationem
              facilis est beatae. Esse eius perferendis provident, repudiandae
              reprehenderit architecto delectus quis ipsa ex ab beatae labore
              explicabo doloremque libero earum culpa, obcaecati molestiae
              blanditiis deleniti non, inventore recusandae perspiciatis porro
              eligendi! Veritatis soluta numquam, nam voluptatum fugiat
              temporibus? Dolor totam maxime nisi ea ut accusamus obcaecati
              autem quibusdam nobis numquam, hic sed neque debitis ipsum
              necessitatibus ullam at deserunt sapiente? Nihil pariatur amet
              error quia officiis, ea commodi optio magni blanditiis sequi odit
              veritatis reiciendis consequuntur. Tempore asperiores repudiandae
              rem vel quidem placeat dolor, exercitationem fugit veritatis
              assumenda in saepe non perferendis, tempora aliquid temporibus.
              Corrupti, aliquam voluptatem? Libero aliquid dolore, molestiae
              beatae magnam perspiciatis quia fugiat illo nam harum eos impedit
              corrupti ipsum tempore deleniti ad voluptatem aperiam asperiores
              amet animi praesentium at nulla dolorem nemo. Architecto, unde
              beatae, alias magni animi facere atque mollitia ipsam, vitae
              possimus neque blanditiis pariatur? Reiciendis ut impedit error
              vitae nam iure consequatur esse harum excepturi repudiandae amet,
              a quidem sequi quaerat nostrum, dolores dolorum nesciunt sit illo
              quos maiores. Officiis natus ipsa ex, autem accusantium blanditiis
              rerum saepe quas quis sint, nam sapiente molestiae praesentium
              suscipit animi fuga aspernatur perferendis recusandae maxime optio
              assumenda cum. Aliquid dignissimos quaerat nobis eveniet, magni
              laboriosam rem ad quisquam accusantium adipisci quia qui, itaque
              facilis autem illo modi sapiente, porro a dolor voluptates dicta
              nemo nisi minus. Cupiditate natus, minus labore veniam,
              architecto, doloribus distinctio pariatur quisquam harum
              asperiores dolores consequatur autem qui alias in optio iure
              accusamus culpa placeat perferendis cum. Quas at iure eius ea.
              Odio necessitatibus perferendis consectetur ab ipsam praesentium
              sunt odit molestiae et. Odio ad maxime, doloremque nulla qui
              praesentium nostrum distinctio, voluptatem debitis incidunt hic
              laudantium delectus perferendis dolor quis reiciendis velit
              aperiam quibusdam ut voluptates error voluptas. Minima voluptatem
              nobis aperiam aut nesciunt nam esse ad hic iste libero nemo enim
              error expedita, et tenetur beatae? Tempora unde nulla error.
              Eligendi temporibus, quisquam ut aut ea molestiae et perferendis
              id dolorem similique quia! Dolores asperiores numquam assumenda,
              pariatur necessitatibus, eum sint tempora accusamus accusantium
              eos quasi labore ullam amet quae maxime quam possimus laboriosam
              soluta deserunt. Fuga qui, nemo deserunt beatae magni eveniet modi
              doloremque aperiam veniam nobis explicabo, ea eius necessitatibus
              at nostrum doloribus cupiditate? Eligendi magnam enim non alias
              labore saepe itaque libero quo est voluptate veritatis illo
              sapiente dolorum ea atque sequi cum ipsam distinctio dolorem
              consectetur optio, numquam sint. Deleniti sed dignissimos, eum
              impedit rerum quam corporis minima excepturi nisi assumenda
              provident consectetur architecto! Quam et fugit molestiae. Labore
              et, veritatis placeat ab quis rerum voluptatem voluptatibus magni
              voluptas mollitia perspiciatis dolore explicabo nihil numquam. Ex
              quo, dolores quisquam asperiores non eos esse quae ut nobis
              eveniet ducimus ipsam, labore, laboriosam natus sint aliquam rerum
              repudiandae harum aut quasi reiciendis illum id nisi. Ab ratione
              repudiandae eos. Veritatis cupiditate autem id quisquam eligendi
              dolorum nobis nostrum laboriosam optio nisi! Beatae consequuntur
              placeat rerum laboriosam, ut dolor in veritatis neque numquam
              nemo! Autem, ea? Ducimus impedit a ad iste, voluptates
              necessitatibus quas ipsam vero amet at nobis esse odio vitae
              accusamus molestias saepe modi dolorum. Maxime rem sunt,
              temporibus dignissimos molestiae perspiciatis assumenda aperiam
              dolor nemo voluptate, saepe cum laudantium totam? Quaerat officia
              at veniam explicabo earum eligendi distinctio magni sequi impedit
              ex mollitia facilis adipisci a enim, cumque eius vero!
            </div>
            <div className="message_input">
              <form action="" className="message_form">
                <div className="message_form_group">
                  <input type="text" />
                </div>
              </form>
            </div>
          </div>
          <div className="chat_content_items chat_person_content"></div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Chat;
const Wrapper = styled.section`

  width: 100%;
  background-color: #fafafa;
  padding: 10px 0 0 0;
  .chat_form{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .chat_container {
    /* max-width: 1500px;
    margin: 0 auto; */
  }
  .chat_content {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }
  .chat_content .chat_content_items {
    /* height: calc(100vh - 100px); */
    border-right: 1px solid #0a0a0a;
    /* padding: 15px; */
  }
  .chat_content div:last-child {
    border-right: none;
  }
  .chat_group_content_header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    h1 {
      font-size: 30px;
      text-transform: uppercase;
    }
  }
  .add_btns button {
    background: #198ffe;
    color: #fff;
    padding: 7px 10px;
    outline: none;
    border: none;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -20px;
    cursor: pointer;
    .add_btns_icon {
      font-size: 30px;
      color: #fff;
    }
  }
  .chat_form button {
    margin-top: 10px;
  }
  .chat_themes_items {
    list-style: none;
    padding: 12px 15px;
    /* background: #e8f6f0; */
    /* border: 1px solid #49cb8f; */
    text-align: center;
    width: 100%;
    color: #fff;
    .chat_themes_title{
      color:#000;
      font-size: 24px;
      font-weight: 600;
   
    }
    .chat_themes_date span{
      color:#000;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .chat_themes_items  {
    color: #0a0a0a;
       cursor: pointer;
      :hover{
        background: #eee;
      }
  }
  .chat_themes {

    overflow-y: scroll;
    /* z-index: -1; */
    overflow-y: visible;
    overflow-x: hidden;
 ::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #49cb8f; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background:  #49ab9f; 
  cursor: pointer;
; 
}
  
}
  }
  .chat_themes ul {
    padding: 0;
    margin-top: 30px;
  }
  .chat_message_content{
position: relative;

.message_input{
  position: absolute;
  bottom: 0;
  width:100%;
 
  }
   .message_form{
     width: 100%;
     display: block;
     .message_form_group{
       width: 100%;
       background: red;
       display: block;
   input{
          width: 100%;
    }
     }
 
}
.message_content{
  height: calc(100vh - 230px);
      overflow-y: scroll;
    /* z-index: -1; */
    overflow-y: visible;
    overflow-x: hidden;
 ::-webkit-scrollbar {
  width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #49cb8f; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background:  #49ab9f; 
  cursor: pointer;
; 
}
}
  }
  .message_content_title{
    color:#2993FC;
    text-align: center;
    font-size: 30px;
    padding: 0;
    margin: 0;
  }
  .message_content_subtitle{
     color:#2993FC;
    text-align: center;
    font-size: 16px;
  }

`;
