export interface SituacaoTarefa {
    id_situacao_tarefa: number;
    ds_situacao_tarefa: string;
    dt_inicio_vigencia: string;
    dt_fim_vigencia: string | null;
    status: boolean;
}