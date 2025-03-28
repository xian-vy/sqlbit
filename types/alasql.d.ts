declare module 'alasql/dist/alasql.min' {
    interface Database {
        exec(sql: string, params?: unknown[]): unknown;
    }

    interface AlasqlOptions {
        sqllogictest?: boolean;
        cache?: boolean;
        autocommit?: boolean;
    }

    interface Alasql {
        (sql: string, params?: unknown[]): unknown;
        databases: { [key: string]: Database };
        options: AlasqlOptions;
    }

    const alasql: Alasql;
    export default alasql;
}