import { Component, OnInit } from '@angular/core';
import { EstudanteService } from 'src/app/shared/estudante.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-estudante',
  templateUrl: './estudante.component.html',
  styleUrls: ['./estudante.component.css']
})
export class EstudanteComponent implements OnInit {

  mensagem: string;

  constructor(
    public service: EstudanteService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
        form.resetForm();
    }
    this.service.formData = {
      id: null,
      nome: '',
      nomeFilial: '',
      numeroLista: '',
      guardiaoTelefoneNo: ''
    }
  }

  onSubmit(form: NgForm) {
    
    // Redefina o valor da mensagem.
    this.mensagem = '';

    // Fazendo a cópia do formulário e atribuindo ao estudanteDado.
    let estudanteDado = Object.assign({}, form.value);

    // Para evitar bagunçar o id do documento e apenas atualizar os demais dados do aluno. 
    // Removeremos a 'propriedade' dos dados do aluno.
    delete estudanteDado.id;

    // Faz a operação de inserção.
    if (form.value.id == null) {
      this.firestore.collection('estudantes').add(estudanteDado);
      this.mensagem = estudanteDado.nome + ' a informação foi salva com sucesso!';
    } else {
      
      // Faz a operação de atualização para o estudante selecionado
      // O objeto 'estudanteDado' tem os detalhes atualizados do estudante.
      this.firestore.doc('estudantes/' + form.value.id).update(estudanteDado);
      this.mensagem = 'Estudante atualizado com sucesso!';
    }

    // Redefina o formulário se a operação for bem-sucedida.
    this.resetForm(form);
  }
}
