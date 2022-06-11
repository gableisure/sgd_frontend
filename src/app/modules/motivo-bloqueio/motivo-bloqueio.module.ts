export interface MotivoBloqueio {
    id_motivo_bloqueio: number;
    tx_motivo_bloqueio: string;
    dt_inicio_vigencia: string;
    dt_fim_vigencia: string | null;
    status: boolean;
}