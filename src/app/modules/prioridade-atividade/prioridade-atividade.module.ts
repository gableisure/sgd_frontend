export interface PrioridadeAtividade {
    id_prioridade_atividade: number;
    ds_prioridade_atividade: string;
    dt_inicio_vigencia: string;
    dt_fim_vigencia: string | null;
    status: boolean;
    nome_icone: string;
    classe_icone: string;
}