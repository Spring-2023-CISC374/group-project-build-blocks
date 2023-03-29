grammar BlockLang;

program
    : statement+ EOF
    ;

statement
    : loopStatement
    | moveStatement
    ;

loopStatement
    : 'loop' NUMBER statement+ 'endloop'
    ;

moveStatement
    : 'up' 
    | 'down' 
    | 'left' 
    | 'right'
    ;

NUMBER
    : [0-9]+
    ;

WHITESPACE
    : [ \t\r\n]+ -> skip
    ;
