<template>
<v-container>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="360" @keydown.esc="cancelFilterModal">
            <v-btn slot="activator" class="blue-grey--text lighten-2" color="orange accent-1">
                <v-icon dark>edit</v-icon>
                Edit
            </v-btn>
        <v-card>
            <v-container >
                <v-layout row wrap>
                    <v-flex xs-12>
                        <v-toolbar dark  color="blue-grey lighten-2">
                            <v-toolbar-title>
                                <div class="text-xs-center">Edit company</div>
                            </v-toolbar-title>
                        </v-toolbar>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs-12>
                        <v-card-text>
                            <v-text-field v-model = "editedCompany.name" v-validate="'required'" prepend-icon="language" name="editedName" label="Name" type="text"></v-text-field>
                            <v-text-field v-model = "editedCompany.address" v-validate="'required'" prepend-icon="location_on" name="editedAddress" label="Address" type="text"></v-text-field>
                            <v-text-field v-model = "editedCompany.phone" v-validate="'required'" prepend-icon="phone" name="editedPhone" label="Phone" type="text"></v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                 <v-layout row wrap>
                    <v-flex xs-12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat block @click.native="dialog = false">Cancel</v-btn>
                            <v-btn class="blue-grey lighten-2" block dark @click.native="onSave">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
        </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import { companyService } from '../../../services/companyService';
export default {
    props: ['company'],
    data () {
        return {
            editedCompany: {
                id: this.company.id,
                name: this.company.name,
                phone: this.company.phone,
                address: this.company.address,
               
            },
            dialog: false,
        }
    },
    methods: {
        onSave () {
            if (this.editedCompany.name.trim() == '' 
                || this.editedCompany.phone.trim() == '' 
                || this.editedCompany.address === null) {
                return
            }
            companyService.editCompany(this.editedCompany);
            this.dialog = false;
        },
        cancelFilterModal () {
            this.dialog = false;
        },
    },
    
}
</script>

