import { Component, OnInit } from '@angular/core';
import { EstudanteService } from 'src/app/shared/estudante.service';
import { Estudante } from 'src/app/shared/estudante.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-estudante-lista',
  templateUrl: './estudante-lista.component.html',
  styleUrls: ['./estudante-lista.component.css']
})
export class EstudanteListaComponent implements OnInit {

  deletarMensagem: string;
  estudanteLista: Estudante[];

  constructor(
    private service: EstudanteService,
    private fireStore: AngularFirestore
  ) { }

  ngOnInit(){
    this.service.buscarTodosEstudantes().subscribe(response => {
      this.estudanteLista = response.map(document => {
        return {
          id: document.payload.doc['id'],
          ...document.payload.doc.data() as {}
        } as Estudante;
      })

      // Classificando a lista de estudantes em ordem crescente.
      this.estudanteLista = this.estudanteLista.sort((obj1, obj2) => (obj1 as any).numeroLista - (obj2 as any).numeroLista);
    });
  }

  onEditar(estudante: Estudante) {
    this.service.formData = Object.assign({}, estudante);
  }

  onDeletar(estudante: Estudante) {
    this.fireStore.doc('/estudantes/' + estudante.id).delete();
    this.deletarMensagem = estudante.nome + 'informação foi apagada com sucesso!';
  }
}
