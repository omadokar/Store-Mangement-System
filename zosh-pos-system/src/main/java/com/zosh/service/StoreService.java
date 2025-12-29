package com.zosh.service;

import java.util.List;
import com.zosh.domain.StoreStatus;
import com.zosh.model.Store;
import com.zosh.model.User;
import com.zosh.payload.dto.StoreDto;

public interface StoreService {

    StoreDto createStore(StoreDto storeDto, User user);

    StoreDto getStoreById(Long id);

    List<StoreDto> getAllStores();

    Store getStoreByAdmin();

    StoreDto updateStore(Long id, StoreDto storeDto);

    void deleteStore(Long id);

    StoreDto getStoreByEmployee();

    StoreDto moderateStore(Long id, StoreStatus status);
}