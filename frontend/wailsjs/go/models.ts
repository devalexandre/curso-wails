export namespace internal {
	
	export class Historico {
	    id: number;
	    task_id: number;
	    texto: string;
	    // Go type: time
	    data: any;
	
	    static createFrom(source: any = {}) {
	        return new Historico(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.task_id = source["task_id"];
	        this.texto = source["texto"];
	        this.data = this.convertValues(source["data"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PartialTask {
	    id: number;
	    // Go type: time
	    data_entrega: any;
	
	    static createFrom(source: any = {}) {
	        return new PartialTask(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.data_entrega = this.convertValues(source["data_entrega"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Tasks {
	    id: number;
	    titulo: string;
	    descricao: string;
	    estimativa: number;
	    // Go type: time
	    data_criacao: any;
	    // Go type: time
	    data_entrega?: any;
	    historico: Historico[];
	
	    static createFrom(source: any = {}) {
	        return new Tasks(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.titulo = source["titulo"];
	        this.descricao = source["descricao"];
	        this.estimativa = source["estimativa"];
	        this.data_criacao = this.convertValues(source["data_criacao"], null);
	        this.data_entrega = this.convertValues(source["data_entrega"], null);
	        this.historico = this.convertValues(source["historico"], Historico);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

