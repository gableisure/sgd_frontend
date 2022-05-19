export interface PerfilUsuario {
    id_perfil_usuario: number;
    ds_perfil_usuario: string;
    dt_inicio_vigencia: string;
    dt_fim_vigencia: string | null;
    status: boolean;
}