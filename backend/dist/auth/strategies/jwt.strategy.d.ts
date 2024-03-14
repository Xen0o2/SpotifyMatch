import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: {
        name: string;
        sub: string;
    }): Promise<{
        name: string;
        sub: string;
    }>;
}
export {};
