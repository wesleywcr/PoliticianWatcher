
export interface IDeputsResponse {
  dados: Dados;
  links: Link[];
}

export interface Dados {
  cpf:                 string;
  dataFalecimento:     string;
  dataNascimento:      string;
  escolaridade:        string;
  id:                  number;
  municipioNascimento: string;
  nomeCivil:           string;
  redeSocial:          string[];
  sexo:                string;
  ufNascimento:        string;
  ultimoStatus:        UltimoStatus;
  uri:                 string;
  urlWebsite:          string;
}

export interface UltimoStatus {
  condicaoEleitoral: string;
  data:              string;
  descricaoStatus:   string;
  email:             string;
  gabinete:          Gabinete;
  id:                number;
  idLegislatura:     number;
  nome:              string;
  nomeEleitoral:     string;
  siglaPartido:      string;
  siglaUf:           string;
  situacao:          string;
  uri:               string;
  uriPartido:        string;
  urlFoto:           string;
}

export interface Gabinete {
  andar:    string;
  email:    string;
  nome:     string;
  predio:   string;
  sala:     string;
  telefone: string;
}

export interface Link {
  href: string;
  rel:  string;
  type: string;
}
