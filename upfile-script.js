var dropZone = document.getElementById("drop-zone");
        var fileInput = document.getElementById("html5-file-input");
        var detailsBox = document.getElementById("details-box");
        var detailName = document.getElementById("detail-name");
        var detailSize = document.getElementById("detail-size");
        var detailFormat = document.getElementById("detail-format");

        // Abre caixa de seleção manual ao clicar na área
        dropZone.onclick = function() {
            fileInput.click();
        };

        // Seleção manual de arquivo
        fileInput.onchange = function() {
            if (fileInput.files.length > 0) {
                processFile(fileInput.files[0]);
            }
        };

        // Eventos de arrastar por cima da área (Drag and Drop)
        dropZone.ondragover = function(e) {
            e.preventDefault();
            this.className = "drag-drop-zone dragover";
        };

        dropZone.ondragleave = function(e) {
            e.preventDefault();
            this.className = "drag-drop-zone";
        };

        dropZone.ondrop = function(e) {
            e.preventDefault();
            this.className = "drag-drop-zone";
            if (e.dataTransfer.files.length > 0) {
                fileInput.files = e.dataTransfer.files; // Sincroniza com o input
                processFile(e.dataTransfer.files[0]);
            }
        };

        // Extração dos dados do arquivo selecionado/arrastado
        function processFile(file) {
            if (!file) return;

            // Nome
            detailName.innerHTML = file.name;

            // Tamanho formatado de forma limpa
            detailSize.innerHTML = formatBytes(file.size);

            // Formato/Extensão
            var extension = file.name.split('.').pop().toUpperCase();
            var mimeType = file.type || "Unrecognized file type";
            detailFormat.innerHTML = mimeType + " (." + extension + ")";

            // Exibe a caixa de informações
            detailsBox.style.display = "block";
        }

        // Função auxiliar para formatar tamanhos em KB, MB ou GB de forma amigável
        function formatBytes(bytes) {
            if (bytes === 0) return '0 Bytes';
            var k = 1024;
            var dm = 2; // Duas casas decimais
            var sizes = ['Bytes', 'KB', 'MB', 'GB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }
       
       
       function copyValue(inputId, tooltipId) {
            var copyText = document.getElementById(inputId);
            
            // Seleciona o conteúdo do input
            copyText.select();
            copyText.setSelectionRange(0, 99999); /* Suporte a dispositivos móveis */
            
            try {
                // Copia usando a API moderna se disponível ou o fallback tradicional
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(copyText.value);
                } else {
                    document.execCommand("copy");
                }
                
                // Exibe o tooltip visual temporário
                var tooltip = document.getElementById(tooltipId);
                tooltip.style.display = "block";
                
                setTimeout(function() {
                    tooltip.style.display = "none";
                }, 1500);
                
            } catch (err) {
                // Tratamento silencioso em caso de navegadores sem permissões
            }
        }
       