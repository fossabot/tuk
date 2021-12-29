import { Condition, CurrentUse, HistoricUse, PhysicalType, Status } from "../entities/trig.entity";
import { IsNotEmpty, IsPositive, IsLongitude, IsLatitude, Min, IsOptional, Length, IsEnum} from 'class-validator';

export class CreateTrigDto {
    @IsOptional()
    @IsPositive()
    id: number;

    @Length(3, 50)
    name: string;

    @IsLatitude()
    wgs_lat: number;

    @IsLongitude()
    wgs_lon: number;

    @Min(0)
    @IsOptional()
    osgb_eastings: number;

    @Min(0)
    @IsOptional()
    osgb_northings: number;

    @IsEnum(PhysicalType)	
    physical_type: PhysicalType;

    @IsEnum(CurrentUse)	
    current_use: CurrentUse;

    @IsEnum(HistoricUse)	
    historic_use: HistoricUse;

    @IsEnum(Condition)	
    condition: Condition;

    @IsEnum(Status)	
    status: Status;
}
