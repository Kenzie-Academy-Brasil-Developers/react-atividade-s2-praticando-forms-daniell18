import "./App.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

function App() {
  const [isTrue, setIsTrue] = useState(true);
  const [card, setCard] = useState();
  const schema = yup.object().shape({
    name: yup.string().required("Nome Obrigatorio"),
    Email: yup.string().required("Email obrigatorio").email("Email invalido"),
    cellphone: yup.string().required("Telefone Obrigatorio"),
    address: yup.string().required("Endereço Obrigatorio"),
    password: yup
      .string()
      .required("Senha Obrigatorio")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "Coloque uma senha mais forte"
      ),
    confirmedPassword: yup
      .string()
      .required("Campo Obrigatorio")
      .oneOf([yup.ref("password"), null], "Senhas diferentes"),
    user: yup.string().required("Nome de usuario Obrigatorio"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitFunction = (e) => {
    setCard(e);
    setIsTrue(false);
  };

  return (
    <div className="App">
      <>
        {isTrue ? (
          <div>
            <h3>Formulario</h3>
            <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
              <div className="info">
                <input placeholder="Nome" {...register("name")} />
                <p>{errors.name?.message}</p>
              </div>
              <div className="info">
                <input placeholder="Usuario" {...register("user")} />
                <p>{errors.user?.message}</p>
              </div>
              <div className="info">
                <input placeholder="Email" {...register("Email")} />
                <p>{errors.Email?.message}</p>
              </div>
              <div className="info">
                <input placeholder="Telefone" {...register("cellphone")} />
                <p> {errors.cellphone?.message}</p>
              </div>
              <div className="info">
                <input placeholder="Endereço" {...register("address")} />
                <p>{errors.address?.message}</p>
              </div>
              <div className="info-senha">
                <div className="info">
                  <input
                    placeholder="Senha"
                    type="password"
                    {...register("password")}
                  />
                  <p>{errors.password?.message} </p>
                </div>
                <div className="info">
                  <input
                    type="password"
                    placeholder="Confirmar Senha"
                    {...register("confirmedPassword")}
                  />
                  <p> {errors.confirmedPassword?.message}</p>
                </div>
              </div>
              <button type="submit">Enviar </button>
            </form>{" "}
          </div>
        ) : (
          <div className="card  ">
            <div className="card-info">
              <h3>Dados Cadastrados</h3>
              <div className="border">Nome:{card.name}</div>
              <div className="border">Email:{card.Email}</div>
              <div className="border">Telefone:{card.cellphone}</div>
              <div className="border">Endereço{card.address}</div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default App;
