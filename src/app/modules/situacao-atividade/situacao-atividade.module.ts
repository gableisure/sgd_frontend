export interface SituacaoAtividade {
    id_situacao_atividade: number;
    ds_situacao_atividade: string;
    dt_inicio_vigencia: string;
    dt_fim_vigencia: string | null;
    status: boolean;
    classe: string;
}