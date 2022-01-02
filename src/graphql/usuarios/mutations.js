import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql`
  mutation UpdateUser(
    $_id: String!
    $Name: String!
    $Lastname: String!
    $Identification: String!
    $Email: String!
    $State: Enum_UserState!
  ) {
    UpdateUser(
      _id: $_id
      Name: $Name
      Lastname: $Lastname
      Identification: $Identification
      Email: $Email
      State: $State
    ) {
      _id
      Name
      Lastname
      Email
      State
      Identification
      Role
    }
  }
`;

const EDITAR_PERFIL = gql `
mutation editProfile($_id: String!, $fields: FieldsEditProfile!) {
  editProfile(_id: $_id, Fields: $fields) {
    _id
    Name
    Lastname
    Identification
  }
}
`
export { EDITAR_USUARIO, EDITAR_PERFIL };
