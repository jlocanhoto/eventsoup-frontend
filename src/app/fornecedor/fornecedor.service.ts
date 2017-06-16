import { Injectable } from '@angular/core';

@Injectable()
export class FornecedorService {

  itens = [
            {"nome": "Item 1", "quantidade": 10, "unidade": "unidades"},
            {"nome": "Item 2", "quantidade": 60, "unidade": "unidades"},
            {"nome": "Item 3", "quantidade": 50, "unidade": "unidades"},
            {"nome": "Item 4", "quantidade": 20, "unidade": "unidades"},
            {"nome": "Item 5", "quantidade": 30, "unidade": "unidades"},
            {"nome": "Item 6", "quantidade": 1, "unidade": "torta"},
            {"nome": "Item 7", "quantidade": 500, "unidade": "gramas"},
            {"nome": "Item 2", "quantidade": 60, "unidade": "unidades"},
            {"nome": "Item 3", "quantidade": 50, "unidade": "unidades"},
            {"nome": "Item 4", "quantidade": 20, "unidade": "unidades"},
            {"nome": "Item 5", "quantidade": 30, "unidade": "unidades"},
            {"nome": "Item 6", "quantidade": 1, "unidade": "torta"},
            {"nome": "Item 7", "quantidade": 500, "unidade": "gramas"},
            {"nome": "Item 2", "quantidade": 60, "unidade": "unidades"},
            {"nome": "Item 3", "quantidade": 50, "unidade": "unidades"},
            {"nome": "Item 4", "quantidade": 20, "unidade": "unidades"},
            {"nome": "Item 5", "quantidade": 30, "unidade": "unidades"},
            {"nome": "Item 6", "quantidade": 1, "unidade": "torta"},
            {"nome": "Item 7", "quantidade": 500, "unidade": "gramas"},
          ]

  constructor() { }
  

  getItens() {
    return this.itens;
  }
}
