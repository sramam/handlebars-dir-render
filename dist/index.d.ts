import * as Handlebars from 'handlebars';
export interface Options {
    handlebars?: Handlebars;
    hb_options?: any;
}
export interface File {
    path: string;
    stats: any;
}
export declare const render: (srcDir: string, dstDir: string, context: any, filter?: (File: any) => boolean, options?: Options) => Promise<string[]>;
