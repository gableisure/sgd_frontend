export interface SituacaoTarefa {
    id_situacao_tarefa: number;
    ds_situacao_tarefa: string;
    dt_inicio: string;
    dt_fim: string | null;
    status: boolean;
}