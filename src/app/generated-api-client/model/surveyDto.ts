/**
 * Student survey system API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { QuestionDto } from './questionDto';
import { SurveyStatus } from './surveyStatus';

export interface SurveyDto { 
    id?: number;
    name: string;
    creatorId?: number;
    courseId: number;
    questions: Array<QuestionDto>;
    active?: boolean;
    isTemplate?: boolean;
    anonymous?: boolean;
    courseName?: string;
    creatorName?: string;
    endDate?: Date;
    readonly today?: Date;
    status?: SurveyStatus;
}