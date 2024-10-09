'use strict'

const li = document.querySelectorAll('.li')//busca y selecciona todo en el documento que encuentre relacionado con la clase "li"
const bloque = document.querySelectorAll('.bloque')//lo mismo pero con bloque

//Recorre todos los li
li.forEach( ( cadaLi , i)=>{//recorre cada li y tiene la posición
    li[i].addEventListener('click',()=>{//recorre en cada li para verificar el click?
        //recorre todos los li
        li.forEach( ( cadaLi , i)=>{//asignamos un "click" a todos los li
            //Removiendo la clase "activo" de cada li y cada bloque
            li[i].classList.remove('activo')
            bloque[i].classList.remove('activo')
        })
        //añade la clase "activo" segun que tenga el click
        li[i].classList.add('activo')// una vez removido las clases, recien ahora agrega la clase "activo" al li que recibio el click
        bloque[i].classList.add('activo')

    })
})