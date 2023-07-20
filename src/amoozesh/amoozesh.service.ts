import { Injectable } from '@nestjs/common';
import { Amoozesh } from './amoozesh.entity';
import { AmoozeshRepository } from './amoozesh.repository';

@Injectable()
export class AmoozeshService {
  constructor(private readonly amoozeshRepository: AmoozeshRepository) {}

  async all(): Promise<Amoozesh[]> {
    return await this.amoozeshRepository.getAll();
  }

  async get(id: string): Promise<Amoozesh> {
    return await this.amoozeshRepository.getById(id);
  }

  async add(amoozesh: Amoozesh): Promise<Amoozesh[]> {
    await this.amoozeshRepository.add(amoozesh);
    // this.userService.addUser(amoozesh.id, 'amoozesh', amoozesh.nationalcode);
    return this.all();
  }

  async update(id: string, amoozesh: Amoozesh): Promise<Amoozesh[]> {
    await this.delete(id);
    await this.add(amoozesh);
    return this.all();
  }

  async delete(id: string): Promise<Amoozesh[]> {
    await this.amoozeshRepository.delete(id);
    return this.all();
  }
}
