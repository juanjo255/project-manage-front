import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { PROYECTOS } from "graphql/proyectos/queries";
import DropDown from "components/Dropdown";
import { Dialog } from "@mui/material";
import { Enum_EstadoProyecto, Enum_TipoObjetivo } from "utils/enums";
import { EDITAR_PROYECTO } from "graphql/proyectos/mutations";
import useFormData from "hooks/useFormData";
import PrivateComponent from "components/PrivateComponent";
import { Link } from "react-router-dom";
import { CREAR_INSCRIPCION } from "graphql/inscripciones/mutaciones";
import { useUser } from "context/userContext";
import { toast } from "react-toastify";
import Input from "components/Input";
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from "components/Accordion";
import ReactLoading from "react-loading";
import { FILTRAR_AVANCES } from "graphql/avance/queries";
import { EDITAR_OBSERVACION } from "graphql/avance/mutations";
import { nanoid } from "nanoid";

const IndexProyectos = () => {
  const { data: queryData, loading, error, refetch } = useQuery(PROYECTOS);
  const { userData } = useUser();

  useEffect(() => {
    if (error) {
      toast.error("Error cargando proyectos");
    }
  }, [error]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen  bg-black">
        <ReactLoading
          type={"spinningBubbles"}
          color={"#0080FF"}
          height={"30%"}
          width={"10%"}
        />
      </div>
    );
  }

  if (queryData && userData) {
    return (
      <div className="p-10 flex flex-col ">
        <div className="flex w-full items-center justify-center">
          <h1 className="flex justify-center font-extrabold text-4xl">
            PROJECT LIST
          </h1>
        </div>
        <PrivateComponent roleList={["ADMINISTRATOR", "LEADER"]}>
          <div className="my-2 self-end">
            <button className="bg-indigo-500 text-gray-50 font-medium p-2 rounded-lg shadow-lg hover:bg-indigo-400">
              <Link to="/proyectos/nuevo">Create project</Link>
            </button>
          </div>
        </PrivateComponent>
        <div>
          {userData.Role === "LEADER"
            ? queryData.Projects.map((proyect) => {
                return (
                  <div key={nanoid()}>
                    {userData._id === proyect.Leader._id ? (
                      <AccordionProyecto
                        proyecto={proyect}
                        key={proyect._id}
                        refetch={refetch}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })
            : queryData.Projects.map((proyect) => {
                return (
                  <AccordionProyecto
                    proyecto={proyect}
                    key={proyect._id}
                    refetch={refetch}
                  />
                );
              })}
        </div>
      </div>
    );
  }
  return (
    <>
      No hay datos{" "}
      <button className="bg-indigo-500 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-indigo-400">
        <Link to="/proyectos/nuevo">Create new project</Link>
      </button>
    </>
  );
};

const AccordionProyecto = ({ proyecto, refetch }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [inscriptionState, setInscriptionState] = useState("");
  const { data: dataAvances, loading } = useQuery(FILTRAR_AVANCES, {
    variables: { ProjectId: proyecto._id },
  });
  const { userData } = useUser();

  useEffect(() => {
    if (userData && proyecto.Inscriptions) {
      const flt = proyecto.Inscriptions.filter(
        (el) => el.Student._id === userData._id
      );
      if (flt.length > 0) {
        setInscriptionState(flt[0].Inscription_State);
      }
    }
  }, [userData, proyecto.Inscriptions]);

  if (loading) {
    return (
      <div>
        <ReactLoading
          type={"cubes"}
          color={"#0080FF"}
          height={"30%"}
          width={"10%"}
        />
      </div>
    );
  }

  return (
    <div>
      <AccordionStyled>
        <AccordionSummaryStyled
          expandIcon={<i className="fas fa-chevron-down" />}
        >
          <div className="flex w-full justify-between">
            <div className="uppercase font-bold text-black ">
              {proyecto.NameProject} - {proyecto.ProjectState}
            </div>
          </div>
        </AccordionSummaryStyled>

        <AccordionDetailsStyled>
          {inscriptionState === "ACCEPTED" ||
          ["ADMINISTRATOR", "LEADER"].includes(userData.Role) ? (
            <div className="flex w-full justify-end">
              <div
                onClick={() => {
                  setShowDialog(true);
                }}
              >
                <i className="mx-4 fas fa-pen  hover:text-gray-100 cursor-pointer" />
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="font-semibold text-black">
            Liderado por: {proyecto.Leader.Name} {proyecto.Leader.Lastname}
          </div>
          <div className="font-semibold text-black">
            Documento: {proyecto.Leader.Identification}
          </div>
          <div className="flex">
            {proyecto.Objectives.map((objetivo) => {
              return (
                <Objetivo
                  tipo={objetivo.Type}
                  descripcion={objetivo.Description}
                  key={nanoid()}
                />
              );
            })}
          </div>
          <PrivateComponent roleList={["STUDENT"]}>
            <InscripcionProyecto
              idProyecto={proyecto._id}
              estado={proyecto.ProjectState}
              estadoInscripcion={inscriptionState}
              refetch={refetch}
            />
          </PrivateComponent>
        </AccordionDetailsStyled>
        <AccordionDetailsStyled>
          {dataAvances && inscriptionState === "ACCEPTED" ? (
            dataAvances.filtrarAvance.map((avance) => {
              return (
                <div className="flex flex-col bg-white" key={nanoid()}>
                  <span className="font-semibold">
                    Avance creado por{" "}
                    {avance.CreatedBy.Name + " " + avance.CreatedBy.Lastname}
                  </span>
                  <p> {avance.Observations} </p>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </AccordionDetailsStyled>
      </AccordionStyled>

      <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <FormEditProyecto
          _id={proyecto._id}
          proyecto={proyecto}
          avance={
            dataAvances.filtrarAvance[0] ? dataAvances.filtrarAvance[0] : " "
          }
          key={nanoid()}
          setShowDialog={setShowDialog}
          refetch={refetch}
        />
      </Dialog>
    </div>
  );
};

const Objetivo = ({ tipo, descripcion }) => {
  return (
    <div className="mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl">
      <div className="text-lg font-bold">{tipo}</div>
      <div>{descripcion}</div>
    </div>
  );
};

const InscripcionProyecto = ({
  idProyecto,
  estado,
  estadoInscripcion,
  refetch,
}) => {
  const [crearInscripcion, { data, loading, error }] =
    useMutation(CREAR_INSCRIPCION);
  const { userData } = useUser();

  useEffect(() => {
    if (data) {
      toast.success("Inscripcion creada con exito");
    } else if (error) {
      toast.error("Error creando inscripción");
    }
  }, [data, error]);

  const confirmarInscripcion = () => {
    crearInscripcion({
      variables: { Project: idProyecto, Student: userData._id },
    });
    refetch();
  };
  return (
    <>
      {estadoInscripcion !== "" ? (
        <span className="font-bold">
          You are already enrolled on this project - Status: {estadoInscripcion}
        </span>
      ) : (
        <button
          onClick={() => {
            confirmarInscripcion();
          }}
          disabled={estado === "INACTIVE"}
          type="submit"
          className="bg-indigo-700 text-white font-bold text-lg py-3 px-6  rounded-xl
          hover:bg-indigo-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700"
        >
          {loading ? (
            <ReactLoading type="spin" height={30} width={30} />
          ) : (
            <div>Enroll</div>
          )}
        </button>
      )}
    </>
  );
};

const FormEditProyecto = ({
  _id,
  proyecto,
  avance,
  setShowDialog,
  refetch,
}) => {
  const { form, formData, updateFormData } = useFormData();
  const [observations, setObservations] = useState(avance.Observations);
  const [editarProyecto, { data: dataMutation, loading, error }] =
    useMutation(EDITAR_PROYECTO);
  const [editarObservacion] = useMutation(EDITAR_OBSERVACION);

  const submitForm = (e) => {
    e.preventDefault();
    formData.Objectives = Object.values(formData.objetivos);
    delete formData.objetivos;

    formData.Budget = parseFloat(formData.Budget);
    const obs = formData.Observations;
    delete formData.Observations;

    editarProyecto({
      variables: {
        _id,
        Fields: formData,
      },
    });
    editarObservacion({
      variables: {
        _id: avance._id,
        Observations: obs,
      },
    });
  };

  useEffect(() => {
    if (dataMutation) {
      toast.success("Proyecto editado con exito");
      refetch();
      setShowDialog(false);
    } else if (error) {
      toast.error("Error editando proyecto");
      setShowDialog(false);
    }
  }, [dataMutation, error, setShowDialog, refetch]);

  return (
    <div className="p-4">
      <h1 className="font-bold">Modify project</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <Input
          label="Nombre del Proyecto"
          type="text"
          name="NameProject"
          defaultValue={proyecto.NameProject}
          required={true}
        />
        <Input
          label="Presupuesto"
          type="number"
          name="Budget"
          defaultValue={proyecto.Budget}
          required={true}
        />
        <DropDown
          label="Estado del Proyecto"
          name="ProjectState"
          options={Enum_EstadoProyecto}
          defaultValue={proyecto.ProjectState}
        />
        {proyecto.Objectives.map((objetivo) => {
          return (
            <div>
              <Input
                name={`objetivos||${proyecto._id}||Description`}
                label="Descripción"
                type="text"
                defaultValue={objetivo.Description}
                required={true}
              />
              <DropDown
                name={`objetivos||${proyecto._id}||Type`}
                options={Enum_TipoObjetivo}
                label="Tipo de Objetivo"
                defaultValue={objetivo.Type}
                required={true}
              />
            </div>
          );
        })}

        <label htmlFor="Observations" className="flex flex-col my-3">
          <span class="font-bold text-gray-500">Observaciones</span>
          <textarea
            name="Observations"
            placeholder="Observaciones"
            cols="25"
            rows="5"
            onChange={(e) => {
              setObservations(e.target.value);
            }}
            value={observations}
          />
        </label>

        <button
          onClick={() => {}}
          disabled={Object.keys(formData).length === 0}
          type="submit"
          className="bg-indigo-700 text-white font-bold text-lg py-3 px-6 
            rounded-xl hover:bg-indigo-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700"
        >
          {loading ? (
            <ReactLoading type="spin" height={30} width={30} />
          ) : (
            <div> CONFIRM </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default IndexProyectos;
