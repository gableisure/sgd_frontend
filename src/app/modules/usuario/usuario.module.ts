export interface Usuario {
    id_usuario: number;
    nm_usuario: string;
    nr_cpf: string;
    id_perfil_usuario: number;
    ds_perfil_usuario: string;
    id_ted: number;
    dt_inicio_vigencia: string;
    dt_fim_vigencia: string;
    id_motivo_bloqueio: number;
    status: boolean;
}