export interface PrioridadeAtividade {
    id_prioridade_atividade: number;
    ds_prioridade_atividade: string;
    dt_inicio: string;
    dt_fim: string | null;
    status: boolean;
}