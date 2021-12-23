import { Condition, CurrentUse, HistoricUse, PhysicalType, Status } from "../entities/trig.entity";

export class CreateTrigDto {
    id: number;
    name: string;
    wgs_lat: number;
    wgs_lon: number;
    osgb_eastings: number;
    osgb_northings: number;
    physical_type: PhysicalType;
    current_use: CurrentUse;
    historic_use: HistoricUse;
    condition: Condition;
    status: Status;
}
