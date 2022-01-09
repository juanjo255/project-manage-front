import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';
import ReactLoading from 'react-loading';

const IndexUsuarios = () => {
    const { data, error, loading } = useQuery(GET_USUARIOS);
    useEffect(() => {
        if (error) {
        toast.error('Error consultando los usuarios');
        }
    }, [error]);

    if (loading) { return <div className='flex flex-col h-screen justify-center items-center'>
    <ReactLoading  type={"cubes"} color={"#0080FF"} height={'30%'} width={'10%'} />
    </div>; }

    return (
        <PrivateRoute roleList={['ADMINISTRATOR','LEADER']}>
        <div>
            <div className='flex justify-center font-extrabold text-4xl my-5'>Datos Usuarios</div>
            <table className='tabla w-screen overflow-hidden tableSizeScreen '>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Identification</th>
                    <th>Role</th>
                    <th>State</th>
                    <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.Users ? (
                    <>
                        {data.Users.map((campo) => {
                        return (
                            <tr key={campo._id}>
                            <td>{campo.Name}</td>
                            <td>{campo.Lastname}</td>
                            <td>{campo.Email}</td>
                            <td>{campo.Identification}</td>
                            <td>{Enum_Rol[campo.Role]}</td>
                            <td>{Enum_EstadoUsuario[campo.State]}</td>
                            <td>
                                <Link to={`/usuarios/editar/${campo._id}`}>
                                    <i className='fas fa-pen zoomPen' />
                                </Link>
                            </td>
                            </tr>
                        );
                        })}
                    </>
                    ) : (
                    <div>ALGO MAL CON LOS DATOS</div>
                    )}
                </tbody>
            </table>
            <div className='cardSizeScreen organizarBloques my-5 justify-around'>
            {data && data.Users ? (
                    <>
                        {data.Users.map((campo) => {
                        return (
                            <div key={campo._id} className=' m-5 bg-gray-800  p-5 rounded-2xl flex flex-col '>
                                <span className='flex justify-end'>
                                    <Link to={`/usuarios/editar/${campo._id}`}>
                                        <i className='fas fa-pen text-gray-200 zoomPen' />
                                    </Link>
                                </span>
                                <span className='uppercase font-medium text-white'>{campo.Name}</span>
                                <span className='uppercase font-medium text-white'>{campo.Lastname}</span>
                                <span className='font-medium text-white'>{campo.Email}</span>
                                <span className='font-medium text-white'>{campo.Identification}</span>
                                <span className='uppercase font-medium text-white'>{Enum_Rol[campo.Role]}</span>
                            </div>
                        );
                        })}
                    </>
                    ) : (
                    <div>ALGO MAL CON LOS DATOS</div>
                    )}
            </div>

        </div>
        </PrivateRoute>
    );
};

export default IndexUsuarios;