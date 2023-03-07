import React from "react";
import { Dropdown, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userInformationData } from "../store/private/userInformationSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { KullaniciMenu } from "./ComponentCss/MenuCss";
import { BiChevronDown } from "react-icons/bi";
export function Menu() {
  const {isLoggedIn} = useSelector(userInformationData)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandle = () => {
    dispatch(isLoggedIn());
    navigate(location.state?.return_url || "/", {
      replace: true,
    });
  };
  const items = [
    {
      label: <Link to="/profile">Profili Görüntüle</Link>,
      key: "0",
    },
    /* {
      label: <Link to="/">Profili Düzenle</Link>,
      key: "1",
    }, */
    {
      type: "divider",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link className="alt-li" onClick={logoutHandle}>
          Çıkış Yap
        </Link>
      ),
      key: "3",
    },
  ];
  return (
    <KullaniciMenu>
      {isLoggedIn ? (
        <Dropdown className="alt-li" menu={{ items }} trigger={["click"]}>
          <Link onClick={(e) => e.preventDefault()}>
            <Space className="namesurname">
              Ad Soyad
              <BiChevronDown className="down-arrow" />
            </Space>
          </Link>
        </Dropdown>
      ) : (
        <div className="ul-div">
          <ul>
            <Link className="navLink pr-10" to="/auth/login">
              Giriş Yap
            </Link>
            <Link className="navLink border pl-10" to="/auth/signup">
              Hesap Aç
            </Link>
          </ul>
          <button className="kurum-kayit" name="Kurum Kaydı" >
             <Link to="/auth/kayit/kurumsal">Kurum Kaydı</Link>
          </button>
        </div>
      )}
    </KullaniciMenu>
  );
}



