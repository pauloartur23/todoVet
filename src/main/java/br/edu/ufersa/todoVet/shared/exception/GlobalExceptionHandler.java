package br.edu.ufersa.todoVet.shared.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // Erros de validação do Jakarta Bean Validation (@Valid).
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail tratarValidacao(MethodArgumentNotValidException ex) {
        ProblemDetail problem = montarProblema(
                HttpStatus.BAD_REQUEST,
                "Erro de validação de dados de entrada",
                "Um ou mais campos estão inválidos. Corrija e tente novamente."
        );
        Map<String, String> camposComErro = new LinkedHashMap<>();
        for (FieldError fe : ex.getBindingResult().getFieldErrors()) {
            camposComErro.merge(fe.getField(), fe.getDefaultMessage(), (a, b) -> a + "; " + b);
        }
        problem.setProperty("erros", camposComErro);
        return problem;
    }

    // Erros de leitura do JSON (JSON malformado, tipo incompatível ou valor inválido para Enum).
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ProblemDetail tratarMensagemIlegivel(HttpMessageNotReadableException ex) {
        return montarProblema(
                HttpStatus.BAD_REQUEST,
                "Corpo da requisição ilegível",
                "O corpo da requisição é inválido ou contém dados malformatados. Verifique tipos de dados e valores de enum."
        );
    }

    // Violação de regra de negócio (HTTP 422 Unprocessable Entity)
    @ExceptionHandler(OperacaoInvalidaException.class)
    public ProblemDetail tratarOperacaoInvalida(OperacaoInvalidaException ex) {
        return montarProblema(
                HttpStatus.UNPROCESSABLE_ENTITY,
                "Regra de negócio violada",
                ex.getMessage()
        );
    }

    // Recurso não encontrado (HTTP 404 Not Found)
    @ExceptionHandler(EntidadeNaoEncontradaException.class)
    public ProblemDetail tratarEntidadeNaoEncontrada(EntidadeNaoEncontradaException ex) {
        return montarProblema(
                HttpStatus.NOT_FOUND,
                "Recurso não encontrado",
                ex.getMessage()
        );
    }

    // Conflito de duplicidade lançado pela camada de negócio (HTTP 409 Conflict)
    @ExceptionHandler(ConflitoException.class)
    public ProblemDetail tratarConflito(ConflitoException ex) {
        return montarProblema(
                HttpStatus.CONFLICT,
                "Conflito de dados",
                ex.getMessage()
        );
    }

    // Violação de integridade vinda do banco, como unique ou chave estrangeira (HTTP 409 Conflict)
    // A mensagem é fixa de propósito: a do banco expõe SQL e nomes de constraint.
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ProblemDetail tratarIntegridade(DataIntegrityViolationException ex) {
        log.warn("Violação de integridade de dados", ex);
        return montarProblema(
                HttpStatus.CONFLICT,
                "Conflito de dados",
                "A operação viola uma restrição de integridade, como registro duplicado ou em uso."
        );
    }

    // Handler coringa para quaisquer outras exceções derivadas de NegocioException
    @ExceptionHandler(NegocioException.class)
    public ProblemDetail tratarNegocioGenerico(NegocioException ex) {
        return montarProblema(
                HttpStatus.BAD_REQUEST,
                "Violação de regra de negócio",
                ex.getMessage()
        );
    }

    // Acesso negado por falta de permissão, como @PreAuthorize (HTTP 403 Forbidden)
    @ExceptionHandler(AccessDeniedException.class)
    public ProblemDetail tratarAcessoNegado(AccessDeniedException ex) {
        return montarProblema(
                HttpStatus.FORBIDDEN,
                "Acesso negado",
                "Você não tem permissão para executar esta operação."
        );
    }

    // Falha de autenticação, incluindo BadCredentialsException do login (HTTP 401 Unauthorized)
    // Mensagem genérica para não revelar se o erro foi no e-mail ou na senha.
    @ExceptionHandler(AuthenticationException.class)
    public ProblemDetail tratarAutenticacao(AuthenticationException ex) {
        return montarProblema(
                HttpStatus.UNAUTHORIZED,
                "Não autenticado",
                "Credenciais inválidas ou ausentes."
        );
    }

    // Handler final: qualquer erro inesperado vira 500 sem expor stack trace ao cliente.
    @ExceptionHandler(Exception.class)
    public ProblemDetail tratarErroInesperado(Exception ex) {
        // Exceções padrão do Spring MVC (405, 415, rota inexistente...) já trazem o próprio status.
        if (ex instanceof ErrorResponse erroPadrao) {
            return erroPadrao.getBody();
        }
        log.error("Erro inesperado", ex);
        return montarProblema(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Erro interno",
                "Ocorreu um erro inesperado. Tente novamente mais tarde."
        );
    }

    // Monta o ProblemDetail padronizado (RFC 9457) usado por todos os handlers.
    private ProblemDetail montarProblema(HttpStatus status, String titulo, String detalhe) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(status, detalhe);
        problem.setTitle(titulo);
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }
}
