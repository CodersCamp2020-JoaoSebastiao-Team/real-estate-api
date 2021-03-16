//Now, to use elements and stripe constants, we need to declare them in 
//typings.d.ts because TypeScript would normally complain when trying 
//to access stripe or elements.

declare var module: NodeModule;
declare var stripe: any;
declare var elements: any;

interface NodeModule {
    id: string;
}
