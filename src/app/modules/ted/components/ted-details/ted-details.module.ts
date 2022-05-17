export interface TedDetails {
    id_tarefa: number,
    id_ted: number,
    ds_ted: string,
    ds_etapa: string,
    ds_atividade_etapa_eap: string,
    ds_atividade_backlog_etapa: string,
    ds_tarefa: string,
    id_tarefa_pai: number,
    solicitante: string,
    responsavel: string,
    ds_situacao_tarefa: string,
    nr_regra_negocio: string,
    nr_historia_usuario: string,
    tx_observacao: string,
    dt_inicio_tarefa: string,
    dt_fim_tarefa: string,
    dt_inclusao: string
}