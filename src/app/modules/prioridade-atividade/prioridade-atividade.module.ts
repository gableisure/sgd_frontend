export interface PrioridadeAtividade {
    id_prioridade_atividade: number;
    ds_prioridade_atividade: string;
    dt_inicio_vigencia: string;
    dt_fim_vigencia: string | null;
    status: boolean;
    classe: string;
    nome_icone: string;
}