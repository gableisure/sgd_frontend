export interface AtividadeBacklog {
    id_atividade: number,
    id_atividade_etapa_eap: number,
    ds_atividade_etapa_eap: string,
    ds_atividade_etapa: string,
    ds_detalhe_atividade: string,
    id_situacao_atividade: number,
    ds_situacao_atividade: string,
    id_prioridade_atividade: number,
    ds_prioridade_atividade: string,
    id_sprint: number,
    id_ted: number,
    ds_ted: string,
    dt_inicio_atividade: string,
    dt_fim_atividade: string
}