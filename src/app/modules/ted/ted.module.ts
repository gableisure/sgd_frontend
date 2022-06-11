import { Usuario } from "../usuario/usuario.module";

export interface Ted {
    id_ted: number;
    ds_ted: string;
    sg_ted: string;
    dt_inicio_vigencia: string;
    dt_fim_vigencia: string | null;
    tb_usuario: Array<Usuario>;
    status: boolean;
}