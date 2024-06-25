import dotenv from 'dotenv';
const caCert = `
-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUXU3Y2mHgj2kSqCPUHtHfA+ZqvuQwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvOTc3ZGFmNzEtYjY0Ny00NGZkLThlNzYtYzU5ZWQyNTk0
MmE2IFByb2plY3QgQ0EwHhcNMjQwNjI1MjIzMDMzWhcNMzQwNjIzMjIzMDMzWjA6
MTgwNgYDVQQDDC85NzdkYWY3MS1iNjQ3LTQ0ZmQtOGU3Ni1jNTllZDI1OTQyYTYg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKdXpceA
tbCLgVQyzxB8gTE59PKrnEQ69kcyRpINbrAKV2m96hE/acJrAWHRN07AcshltIos
Va9eNQaa28Bd46HeW5YmMPecrr7Onboq6xKX+eHYRNfK11rHipXVAM+438wUowNU
1cOnOdHPayvSDLmagKIza1bij7DB+9QDawwzVdAIPqu2wGDYoIzThfe7IBS8RxYp
Zt6ytenNRNHAvlZ5qqdAwr2iXsKPAC6WCmq2YlZO6gPABHKwzObKNtsR36CgyUaH
5spOil1wDNlZR556rFBVeNUJqP7mDUUqgCDf8RwTbDJxR431zm4RgI8q8MhKVILk
j8SMlmWMOdERw7bW976QhgdeZD83ih1ZyNsFdLN5EvSlXoaGJ8V5trrbfGUwK0GA
htpBsg7bUC3U+ci1ctnb1aa7Fo5For5NkZg5Ok/3fev7iUly+XoM0NHIewZoEpzL
4YIu68IQCVyiJOS8v1OCB3aCKWCC+ZCG5ZLAYIIP7ZgxgoAyOxOT32rJKQIDAQAB
oz8wPTAdBgNVHQ4EFgQU+R9wZXCFWzNdeCYv1owPEah/r9AwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAFsta3S7inzkZl3/
PTW3d3RRf7AiuNDmJNvq2rvXRE9FcAfUttyqvszgVLBmTIHMbnBRMzhqZPTgrsL0
Cw38NV41alhxFYp+BI1lLvdKIIokyNoHxTDAn01ZALU5DNLle5P6aXHtMXnh2RYw
XyQxBNtuwT89fnfbfj584/FQTnfa2ikPtTc9zcRION1hzgcC4dKa9fVTyZAkVlag
4+iqi7hAveZUzJBLLcy5IjmeHQUCZmO+YT5KOVC7utAdXAp+dj9CEfpco966zHpL
6/89/Mie/ID/2XMRsDD9VNiN1eAvWts6nhJRNDqzj5ZqEWU2KsLKau7wb72cML45
E/9c47UpM5NCOeaERGzkQmHYHeOf6MWchUrieN9bOTl9o5K0AxDacj7791m0PZeT
363mGR5xM76pkb2npo/gEgSio0NCZ7vQWHk3F1aziRnO1R2wBwSmqycdMEytqtOQ
e6gkeeej9RYR+gADw91HgV3Uwd+DkUboiLVMEmnWHtt3QkE0wQ==
-----END CERTIFICATE-----
`;
dotenv.config();
export default {
    test: {
        client: 'mysql2',
        connection: {
            database: process.env.PGDATABASE,
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    },

    development: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DATABASE,
            user: process.env.USER,
            password: process.env.PASSWORD,
            port: Number(process.env.DB_PORT) || 3306,
            ssl: {
                ca: caCert ,
            }
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    },

    staging: {
        client: 'mysql2',
        connection: {
            database: process.env.DATABASE,
            user: process.env.USER,
            password: process.env.PASSWORD
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    },

    production: {
        client: 'mysql2',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    }
};
