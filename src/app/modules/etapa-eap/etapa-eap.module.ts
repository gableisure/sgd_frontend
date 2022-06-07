export interface EtapaEap {
    id_etapa: number;
    ds_etapa: string;
    dt_inicio_vigencia: string;
    dt_fim_vigencia: string | null;
    status: boolean;
}