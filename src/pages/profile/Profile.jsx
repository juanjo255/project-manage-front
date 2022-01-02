import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import ButtonLoading from "components/ButtonLoading";
import Input from "components/Input";
import { EDITAR_PERFIL } from "graphql/usuarios/mutations";
import useFormData from "hooks/useFormData";
import { useUser } from "context/userContext";
import { GET_USUARIO } from "graphql/usuarios/queries";
import { toast } from "react-toastify";

const Profile = () => {
  const { form, formData, updateFormData } = useFormData();
  const { userData } = useUser();

  const [editarPerfil, { data: dataMutation, loading: loadingMutation }] =
    useMutation(EDITAR_PERFIL);

  const { data: queryData, loading: queryLoading } = useQuery(GET_USUARIO, {
    variables: { _id: userData._id },
  });

  const submitForm = async (e) => {
    e.preventDefault();

    editarPerfil({
      variables: {
        _id: userData._id,
        fields: formData,
      },
    });
  };

  useEffect(() => {
    if (dataMutation) {
      toast.success("Prefil editado");
    }
    console.log(queryData);
  }, [dataMutation, queryData]);

  if (queryLoading) return <div data-testid="loading">Loading...</div>;

  return (
    <div className="p-10 flex flex-col items-center justify-center w-full">
      <h1 className="font-bold text-2xl text-gray-900" data-testid="perfil">
        User profile
      </h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <Input
          defaultValue={queryData.User.Name}
          label="Name"
          name="Name"
          type="text"
          required
          aria-label="input-Name"
        />
        <Input
          defaultValue={queryData.User.Lastname}
          label="Lastname"
          name="Lastname"
          type="text"
          required
        />
        <Input
          defaultValue={queryData.User.Identification}
          label="Identificación"
          name="Identification"
          type="text"
          required
        />
        <ButtonLoading
          data-testid="buttonLoading"
          text="Confirm"
          loading={loadingMutation}
          disabled={false}
        />
      </form>
    </div>
  );
};

export default Profile;
