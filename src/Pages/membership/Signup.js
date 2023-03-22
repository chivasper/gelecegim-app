import { Helmet } from "react-helmet";
import InputValidation from "../../Components/InputValidation";
import { useState } from "react";
import { LoginDiv } from "./Logincss";
import logosrc from "../../images/revize3.png";
import { Button, Form, Checkbox } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import setLogin from "../../store/userInformation";
function Signup() {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const toggleDisable = () => {
    setDisabled(!disabled);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/auth/signup", {
        email,
        password,
        name,
        surname,
      })
      .then((res) => {
        toast.success("Kayıt Başarılı!");

        navigate(location.state?.return_url || "/auth/login", {
          replace: true,
        });
      })
      .catch((err) => {
        toast.error("email adresi kayıtlıdır.");
      });
  };
  return (
    <LoginDiv>
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <Form className="Form-boyut" form={form} name="dynamic_rule">
        <div className="Login">
          <div className="Login-boyut">
            <div className="Singup-boyut">
              <Link to="/">
                <img src={logosrc} className="img-logo" alt="logo" />
              </Link>
              <div className="Input-div">
                <div className="Input-div-row">
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Lütfen adınızı giriniz!",
                        whitespace: true,
                      },
                      {
                        whitespace: true,
                        message: "Boşluk içeremez!",
                      },
                    ]}
                  >
                    <InputValidation
                      type="text"
                      className="form-input"
                      value={name}
                      label="İsim"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="surname"
                    rules={[
                      {
                        required: true,
                        message: "Lütfen soyisim giriniz!",
                        whitespace: true,
                      },
                      {
                        whitespace: true,
                        message: "Boşluk içeremez!",
                      },
                    ]}
                  >
                    <InputValidation
                      type="text"
                      className="form-input"
                      name="surname"
                      label="Soyisim"
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Geçerli E-posta giriniz!",
                    },
                    {
                      required: true,
                      message: "Lütfen E-postanızı giriniz!",
                    },
                  ]}
                >
                  <InputValidation
                    name="email"
                    className="form-input"
                    label="E-posta"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Lütfen şifrenizi girin!",
                    },
                    {
                      whitespace: true,
                      message: "Boşluk içeremez!",
                    },
                  ]}
                >
                  <InputValidation
                    className="form-input"
                    type="password"
                    name="passwordone"
                    label="Şifre"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Lütfen şifrenizi doğrulayınız!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Girdiğiniz iki şifre uyuşmuyor!")
                        );
                      },
                    }),
                  ]}
                >
                  <InputValidation
                    type="password"
                    className="form-input"
                    label="Şifreyi Onayla"
                  />
                </Form.Item>
                <Checkbox className="form-input" onClick={toggleDisable}>
                  Kuralları okudum kabul ediyorum.
                </Checkbox>
                <Form.Item className="Form-button" shouldUpdate>
                  {() => (
                    <Button
                      onClick={handleSubmit}
                      className="Button"
                      type="primary"
                      disabled={
                        !form.isFieldsTouched(true) ||
                        !!form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length ||
                        !!!disabled
                      }
                    >
                      <Link>Kayıt Ol</Link>
                    </Button>
                  )}
                </Form.Item>
              </div>
              <GoogleLogin />
            </div>
          </div>
          <div className="Sign-up-boyut">
            <div className="displaycentercenter">
              <p>
                Hesabın var mı?
                <Link to="/auth/login" className="signup-login">
                  Giriş Yap
                </Link>
              </p>
            </div>
            <div className="displaycentercenter">
              <p>
                İşletme sahibi misin?
                <Link to="/auth/kayit/kurumsal" className="signup-login">
                  Kurumsal Hesap Aç
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Form>
    </LoginDiv>
  );
}

export default Signup;
