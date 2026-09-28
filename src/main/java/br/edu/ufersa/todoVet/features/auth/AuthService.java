package br.edu.ufersa.todoVet.features.auth;

import br.edu.ufersa.todoVet.features.admin.Admin;
import br.edu.ufersa.todoVet.features.funcionario.Funcionario;
import br.edu.ufersa.todoVet.shared.exception.ConflitoException;
import org.springframework.stereotype.Service;
import br.edu.ufersa.todoVet.features.auth.dtos.AuthDTOs;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AuthService {
    private final UsuarioRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public AuthService(UsuarioRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder; }
    public void registrar(AuthDTOs.RegisterRequestDTO dto) {
        Email email = new Email(dto.email());
        if (userRepository.findByEmail(email).isPresent()) {
            throw new ConflitoException("E-mail já cadastrado no sistema.");
        }
        String encryptedPassword = passwordEncoder.encode(dto.password());
        Senha senha = new Senha(encryptedPassword);
        //= new Usuario(dto.nome(), email, senha, dto.telefone(), dto.role());

        Funcionario funcionario = new Funcionario(dto.nome(), email, senha, dto.telefone(), dto.cargo());
        userRepository.save(funcionario);
    }
}
