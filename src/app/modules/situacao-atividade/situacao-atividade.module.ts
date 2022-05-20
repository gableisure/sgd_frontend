export interface SituacaoAtividade {
    id_situacao_atividade: number;
    ds_situacao_atividade: string;
    dt_inicio: string;
    dt_fim: string | null;
    status: boolean;
}