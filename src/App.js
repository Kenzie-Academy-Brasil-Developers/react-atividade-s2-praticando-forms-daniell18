import "./App.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
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
      .oneOf([yup.ref("password"), null], "Senhas diferente"),
    user: yup.string().required("Nome de usuario Obrigatorio"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitFunction = (e) => {};
  console.log(schema);
  return (
    <div className="App">
      <>
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
              <input placeholder="Senha" {...register("password")} />
              <p>{errors.password?.message} </p>
            </div>
            <div className="info">
              <input
                placeholder="Confirmar Senha"
                {...register("confirmedPassword")}
              />
              <p> {errors.confirmedPassword?.message}</p>
            </div>
          </div>
          <button type="submit">Enviar </button>
        </form>
      </>
    </div>
  );
}

export default App;
