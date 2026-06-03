// Função BBCode (adaptada para usar o textarea sem ID)
function bbcode(tag){
  var txt = document.querySelector('textarea[name="mensagem"]');
  var start = txt.selectionStart;
  var end = txt.selectionEnd;
  var texto = txt.value.substring(start, end);
  var antes = txt.value.substring(0, start);
  var depois = txt.value.substring(end);

  // Tags BBCode
  var tags = {
    b: ['[b]', '[/b]'],
    i: ['[i]', '[/i]'],
    u: ['[u]', '[/u]'],
    quote: ['[quote]', '[/quote]'],
    code: ['[code]', '[/code]'],
    url: ['[url=]', '[/url]'],
    img: ['[img]', '[/img]'],
    list: ['[list]\n[*]', '\n[/list]'],
    list1: ['[list=1]\n[*]', '\n[/list]']
  };

  var abertura = tags[tag][0];
  var fechamento = tags[tag][1];

  // Se for link ou imagem pede URL
  if(tag == 'url'){
    var link = prompt('Digite a URL:', 'http://');
    if(link != null){
      abertura = '[url=' + link + ']';
      texto = texto || 'texto do link';
    }
  } else if(tag == 'img'){
    var link = prompt('Digite a URL da imagem:', 'http://');
    if(link != null){
      abertura = '[img]';
      fechamento = '[/img]';
      texto = link;
    }
  }

  txt.value = antes + abertura + texto + fechamento + depois;
  txt.focus();
  txt.selectionStart = txt.selectionEnd = start + abertura.length + texto.length;
}

// Gerar dinamicamente a barra de botões
document.addEventListener('DOMContentLoaded', function() {
  // Definição dos botões: [tag, ícone, label]
  const botoes = [
    { tag: 'b', icon: 'fa-bold', label: 'B' },
    { tag: 'i', icon: 'fa-italic', label: 'I' },
    { tag: 'u', icon: 'fa-underline', label: 'U' },
    { tag: 'url', icon: 'fa-link', label: 'Link' },
    { tag: 'img', icon: 'fa-image', label: 'Imagem' },
    { tag: 'quote', icon: 'fa-quote-left', label: 'Citação' },
    { tag: 'code', icon: 'fa-code', label: 'Código' },
    { tag: 'list', icon: 'fa-list', label: 'Lista' },
    { tag: 'list1', icon: 'fa-list-ol', label: '1,2,3' }
  ];

  // Criar o container da barra
  var editorDiv = document.querySelector('.editor');
  var barraDiv = document.createElement('div');
  barraDiv.className = 'editor-bar';

  // Criar cada botão e adicionar à barra
  botoes.forEach(function(btn) {
    var button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('onclick', "bbcode('" + btn.tag + "')");
    
    var icon = document.createElement('i');
    icon.className = 'fa ' + btn.icon;
    button.appendChild(icon);
    
    // Espaço e texto (opcional, como nos originais)
    button.appendChild(document.createTextNode(' ' + btn.label));
    
    barraDiv.appendChild(button);
  });

  // Inserir a barra antes do textarea
  var textarea = document.querySelector('textarea[name="mensagem"]');
  editorDiv.insertBefore(barraDiv, textarea);
});
