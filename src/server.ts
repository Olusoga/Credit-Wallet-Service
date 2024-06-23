import server from './application';

server.listen(process.env.PORT, (): void => console.log(`server is running on port ${process.env.PORT}`));
