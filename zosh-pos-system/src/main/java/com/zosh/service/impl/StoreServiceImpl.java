package com.zosh.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.zosh.domain.StoreStatus;
import com.zosh.mapper.StoreMapper;
import com.zosh.model.Store;
import com.zosh.model.StoreContact;
import com.zosh.model.User;
import com.zosh.payload.dto.StoreDto;
import com.zosh.repository.StoreRepository;
import com.zosh.service.StoreService;
import com.zosh.service.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreRepository storeRepository;
    private final UserService userService;

    @Override
    public StoreDto createStore(StoreDto storeDto, User user) {
        Store store = StoreMapper.toEntity(storeDto, user);
        return StoreMapper.toDto(storeRepository.save(store));
    }

    @Override
    public StoreDto getStoreById(Long id) {
        Store store = storeRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Store not found with id: " + id));
        return StoreMapper.toDto(store);
    }

    @Override
    public List<StoreDto> getAllStores() {
        List<Store> dtos = storeRepository.findAll();
        return dtos.stream().map(StoreMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public Store getStoreByAdmin() {
        User admin = userService.getCurrentUser();
        return storeRepository.findByStoreAdminId(admin.getId());

    }

    @Override
    public StoreDto updateStore(Long id, StoreDto storeDto) {
        User currentUser = userService.getCurrentUser();
        Store existing = storeRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Store not found with id: " + id));
        existing.setBrand(storeDto.getBrand());
        existing.setStatus(storeDto.getStatus());
        existing.setDescription(storeDto.getDescription());
        if (storeDto.getStoreType() != null) {
            existing.setStoreType(storeDto.getStoreType());

        }
        if (storeDto.getContact() != null) {
            StoreContact storeContact = StoreContact.builder()
                    .address(storeDto.getContact().getAddress())
                    .phone(storeDto.getContact().getPhone())
                    .email(storeDto.getContact().getEmail())
                    .build();
            existing.setContact(storeContact);
        }
        Store updatedStore = storeRepository.save(existing);
        return StoreMapper.toDto(updatedStore);
    }

    @Override
    public void deleteStore(Long id) {
        Store store = storeRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Store not found with id: " + id));
        storeRepository.delete(store);
    }

    @Override
    public StoreDto getStoreByEmployee() {
        User currentUser = userService.getCurrentUser();
        return StoreMapper.toDto(currentUser.getStore());
    }

    @Override
    public StoreDto moderateStore(Long id, StoreStatus status) {
        Store store = storeRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Store not found"));
        store.setStatus(status);
        return StoreMapper.toDto(storeRepository.save(store));
    }

}
