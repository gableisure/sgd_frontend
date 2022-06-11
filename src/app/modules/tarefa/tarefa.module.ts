export interface Tarefa {
    id_tarefa: number,
    id_ted: number,
    ds_ted: string,
    id_etapa: number,
    ds_etapa: string,
    ds_tarefa: string,
    tb_situacao_tarefa: Object,
    tb_atividade_backlog: Object,
    nr_regra_negocio: string,
    nr_historia_usuario: string,
    tx_observacao: string,
    dt_inicio_vigencia: string,
    dt_fim_vigencia: string,
    dt_inclusao: string
}