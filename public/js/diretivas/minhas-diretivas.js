(function() {
    'use strict';
 
angular.module('minhasDiretivas', [])

    .directive('termoAdesao', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/diretivas/termoAdesao.html';
    
        return ddo;
    })
    .directive('ngCnpjcpf', ngCnpj);
 
    function ngCnpj() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function($scope, $element, $attrs, ngModel) {
                $scope.$watch($attrs.ngModel, function(value) {
                    
                    var validacao = true;
                    
                    if(value != undefined){
                        if(value.length == 18){
                    var cnpj = value.replace(/[^\d]+/g, '');
                        
                    function validarCNPJ (cnpj){
                        if (cnpj == '')
                            return false;

                        if (cnpj.length != 14)
                            return false;

                        // Elimina CNPJs invalidos conhecidos
                        if (cnpj == "00000000000000" ||
                                cnpj == "11111111111111" ||
                                cnpj == "22222222222222" ||
                                cnpj == "33333333333333" ||
                                cnpj == "44444444444444" ||
                                cnpj == "55555555555555" ||
                                cnpj == "66666666666666" ||
                                cnpj == "77777777777777" ||
                                cnpj == "88888888888888" ||
                                cnpj == "99999999999999")
                            return false;

                        // Valida DVs
                        var tamanho = cnpj.length - 2
                        var numeros = cnpj.substring(0, tamanho);
                        var digitos = cnpj.substring(tamanho);
                        var soma = 0;
                        var pos = tamanho - 7;
                        for (var i = tamanho; i >= 1; i--) {
                            soma += numeros.charAt(tamanho - i) * pos--;
                            if (pos < 2)
                                pos = 9;
                        }
                        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                        if (resultado != digitos.charAt(0))
                            return false;

                        tamanho = tamanho + 1;
                        numeros = cnpj.substring(0, tamanho);
                        soma = 0;
                        pos = tamanho - 7;
                        for (i = tamanho; i >= 1; i--) {
                            soma += numeros.charAt(tamanho - i) * pos--;
                            if (pos < 2)
                                pos = 9;
                        }
                        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                        if (resultado != digitos.charAt(1))
                            return false;

                        return true;

                    }
                        validacao = validarCNPJ(cnpj);
                }else if(value.length == 14){
                    var cpf = value.replace(/[^\d]+/g, '');
                    
                    function validarCPF(cpf) {  
                        cpf = cpf.replace(/[^\d]+/g,'');    
                        if(cpf == '') return false; 
                        // Elimina CPFs invalidos conhecidos    
                        if (cpf.length != 11 || 
                            cpf == "00000000000" || 
                            cpf == "11111111111" || 
                            cpf == "22222222222" || 
                            cpf == "33333333333" || 
                            cpf == "44444444444" || 
                            cpf == "55555555555" || 
                            cpf == "66666666666" || 
                            cpf == "77777777777" || 
                            cpf == "88888888888" || 
                            cpf == "99999999999")
                                return false;       
                        // Valida 1o digito 
                        var add = 0;    
                        for (var i=0; i < 9; i ++)       
                            add += parseInt(cpf.charAt(i)) * (10 - i);  
                            var rev = 11 - (add % 11);  
                            if (rev == 10 || rev == 11)     
                                rev = 0;    
                            if (rev != parseInt(cpf.charAt(9)))     
                                return false;       
                        // Valida 2o digito 
                        add = 0;    
                        for (i = 0; i < 10; i ++)        
                            add += parseInt(cpf.charAt(i)) * (11 - i);  
                        rev = 11 - (add % 11);  
                        if (rev == 10 || rev == 11) 
                            rev = 0;    
                        if (rev != parseInt(cpf.charAt(10)))
                            return false;       
                        return true;   
                    }
                    validacao = validarCPF(cpf);
                }
                }
                    
                    var isValid = (validacao == true);
                        
                    ngModel.$setValidity($attrs.ngModel, isValid);
                    
                });
        }
    }} 
})();